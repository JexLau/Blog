---
title: 第8期 | mitt
description: 1.介绍这期读两个源码 mitt 和 tiny-emitter，【发布订阅】的设计模式，周下载量都是在百万级别的，实现原理差不多，mitt 是用 Typescript 实现的，tiny-emitter 是 javascript，且已经三年没更新了（说明比较稳定😃）。【发布订阅】的思想是，订阅...
pubDate: 2022-03-15T06:59:33.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/jpeg/1105483/1646905418347-f8c89f6e-0cce-4321-8247-97e5f346274a.jpeg
---

# 1.介绍
这期读两个源码 mitt 和 tiny-emitter，【发布订阅】的设计模式，周下载量都是在百万级别的，实现原理差不多，mitt 是用 Typescript 实现的，tiny-emitter 是 javascript，且已经三年没更新了（说明比较稳定😃）。

【发布订阅】的思想是，订阅者把订阅的事件注册到调度中心，当该事件触发时候，发布者把该事件发布到调度中心，由调度中心统一调度，触发事件。

![](https://cdn.nlark.com/yuque/0/2022/jpeg/1105483/1646905418347-f8c89f6e-0cce-4321-8247-97e5f346274a.jpeg)

**学习目标：**<br />1）解读源码，了解发布订阅设计模式的应用场景，输出记录文档。

**源码地址：**<br />mitt：[https://github.com/developit/mitt](https://github.com/developit/mitt)<br />tiny-emitter：[https://github.com/scottcorgan/tiny-emitter](https://github.com/scottcorgan/tiny-emitter)

## 2.源码解析

### Mitt
比较习惯Typescript，看看 mitt。发布订阅主要有三个函数，一个订阅函数，一个取消订阅函数，一个发布函数。
```typescript
/** 事件类型，只能为string或symbol */
export type EventType = string | symbol;

/** 事件注册函数类型 */
/** T 指代事件类型，默认为unknown */
export type Handler<T = unknown> = (event: T) => void;

/** 通配符处理器(*) */
/** Record<Keys, Type>：构造一个对象类型，其属性键为Keys，其属性值为Type。此实用程序可用于将一种类型的属性映射到另一种类型。 */
/** Record<string, unknown> 意思就是一个key为string，value为unknown的对象 */
export type WildcardHandler<T = Record<string, unknown>> = (
/** keyof T 代表对象的key值集合 */
type: keyof T,
  /** T[keyof T] 代表对应的key的value */
  event: T[keyof T]
) => void;

// 事件注册函数的集合
export type EventHandlerList<T = unknown> = Array<Handler<T>>;

/** 通配符(*)处理器集合 */
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;

/** 事件处理程序 */
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>;
  
  /** 重载，根据入参类型不同，其回调的类型也不同，下面也是一样 */
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  on(type: '*', handler: WildcardHandler<Events>): void;
  
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
  off(type: '*', handler: WildcardHandler<Events>): void;
  
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}

/**
* Mitt: Tiny (~200b) functional event emitter / pubsub.
* @name mitt
* @returns {Mitt}
*/
export default function mitt<Events extends Record<EventType, unknown>>(
all?: EventHandlerMap<Events>
): Emitter<Events> {
  type GenericEventHandler =
  | Handler<Events[keyof Events]>
  | WildcardHandler<Events>;
  all = all || new Map();
  
  return {
    
    /** 注册的事件名称集合(Map) */
    all,
    
    /**
    * 注册订阅事件
    * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
    * @param {Function} handler Function to call in response to given event
    * @memberOf mitt
    */
    on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
      // ! 表示强制断言，表示一定存在
      // handlers是所有订阅事件的集合
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
      if (handlers) {
        // 之前事件存在过就直接把事件处理函数 push 进去
        handlers.push(handler);
      }
      else {
        // 如果没有，就新set一个 {"type": handler}
        all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
      }
    },
      
      /**
      * 删除事件订阅
      * If `handler` is omitted, all handlers of the given type are removed.
      * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
      * @param {Function} [handler] Handler function to remove
      * @memberOf mitt
      */
      off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
        const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
        if (handlers) {
          if (handler) {
            // 删除事件订阅
            // >>> 表示无符号右移，存在必然能删，不存在也删不着，写法比较优雅
            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
          }
          else {
            // 不存在则重置type的所有handlers
            all!.set(type, []);
          }
        }
      },
        
        /**
        * 发布，触发事件
        *
        * @param {string|symbol} type The event type to invoke
        * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
        * @memberOf mitt
        */
        emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
          // 触发事件注意要先slice拷贝一下，因为在迭代过程中如果调用了off函数，会改变handles
          let handlers = all!.get(type);
          if (handlers) {
            (handlers as EventHandlerList<Events[keyof Events]>)
              .slice()
              .map((handler) => {
              handler(evt!);
            });
          }
          
          handlers = all!.get('*');
          if (handlers) {
            (handlers as WildCardEventHandlerList<Events>)
              .slice()
              .map((handler) => {
              handler(type, evt!);
            });
          }
        }
};
}
```


## 3.总结

发布订阅是比较高频的面试题，在实现emit的过程中，要注意需要拷贝一份handlers数组，避免在迭代过程中，如果调用了off函数，会改变handles数组这个情况。

另外后续加强TypeScript编写复杂类型的能力。
