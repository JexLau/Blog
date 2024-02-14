---
title: 第31期 | plimt
description: 1. 源码简介官网简介：Run multiple promise-returning & async functions with limited concurrency简单理解，控制有限的并发数量，运行多个promise-returning和async functions。就是常见的控制并发...
pubDate: 2022-04-29T01:33:12.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1652272264583-1f393da0-4079-4c4d-917c-53763bad2b35.png
---

## 1. 源码简介
官网简介：Run multiple promise-returning & async functions with limited concurrency<br />简单理解，控制有限的并发数量，运行多个promise-returning和async functions。就是常见的控制并发请求，刚好有一个实践的场景：大文件上传，看完这个库看看能不能派上用场。

## 2. 测试用例
测试用例有点难看懂，花费了不少时间。地址：[https://github1s.com/sindresorhus/p-limit/blob/main/test.js](https://github1s.com/sindresorhus/p-limit/blob/main/test.js)

- concurrency: 1，这个测试用例测试并发数量为1时的场景。
```javascript
test('concurrency: 1', async t => {
	const input = [
		[10, 300],
		[20, 200],
		[30, 100],
	];
	const end = timeSpan();
	const limit = pLimit(1);
	const mapper = ([value, ms]) => limit(async () => {
		await delay(ms);
		return value;
	});
  // 判断输出的值是否等于[10,20,30]
	t.deepEqual(await Promise.all(input.map(x => mapper(x))), [10, 20, 30]);
  // 判断执行时间是否在预期内
	t.true(inRange(end(), {start: 590, end: 650}));
});
```

- concurrency: 4，测试多个并发时，running数是否小于等于并发数
- non-promise returning function，测试非promise返回值
- continues after sync throw，测试抛出异常的情况是否正常执行
- accepts additional arguments，没太看懂这个，字面意思是接受其他参数
- does not ignore errors，测试抛出错误的情况，能否正常接收到错误的值
- activeCount and pendingCount properties，测试activeCount和pendingCount属性
- clearQueue，清空队列
- throws on invalid concurrency argument，测试输入无效参数时的情况

## 3. 源码
简单写写注释，总结流程：

1. 先校验
2. 生成一个promise，入队操作是，queue.enqueue(run.bind(...))，意思是把请求放在队列里了
3. 如果当前执行数 < 并发数，且队列中存在数据，出队运行请求；否则就在队列里等着吧。
4. 当上一个运行完了(run函数的await result)，会唤醒next()函数，出队运行请求。
```javascript
import Queue from 'yocto-queue';
export default function pLimit(concurrency) {
  // 检验参数是Integer，且校验最大最小值
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}
  // 并发队列
	const queue = new Queue();
  // 当前正在执行的请求数
	let activeCount = 0;
  // 执行下一个请求
	const next = () => {
		activeCount--;
		if (queue.size > 0) {
      // 出队操作并执行
			queue.dequeue()();
		}
	};
  // 执行请求任务
	const run = async (fn, resolve, args) => {
    // 当前执行请求数+1
		activeCount++;
		const result = (async () => fn(...args))();
    // resolve出去
		resolve(result);
		try {
      // await 保证执行顺序
			await result;
		} catch {}
		next();
	};
  // 入队操作
	const enqueue = (fn, resolve, args) => {
		queue.enqueue(run.bind(undefined, fn, resolve, args));
		(async () => {
			await Promise.resolve();
      // 如果当前执行数 < 并发数，且队列还有请求
			if (activeCount < concurrency && queue.size > 0) {
        // 出队运行
				queue.dequeue()();
			}
		})();
	};
  // 生成一个promise，入队
	const generator = (fn, ...args) => new Promise(resolve => {
		enqueue(fn, resolve, args);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value: () => {
				queue.clear();
			},
		},
	});
	return generator;
}

```

## 4. 总结
这个库应用场景挺广泛的，明天就加到项目里去。可以多看，面试也经常会被问到。<br />实际使用场景，大文件切片上传并发控制(不控制并发，会有大量接口请求处于pending状态，会有超时的风险)。<br />代码：<br />![f6db7062c05ae151466392d19e6c983.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1652272264583-1f393da0-4079-4c4d-917c-53763bad2b35.png#clientId=ua6fed7b5-a4a2-4&from=paste&height=279&id=ud357098e&originHeight=279&originWidth=786&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27209&status=done&style=none&taskId=u76660524-91be-4787-b8b0-38476312bf8&title=&width=786)<br />效果：<br />![4cb4bb9186e56749543905ccc19583a.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1652272258388-09c14585-f7f3-4183-a7b7-1b64fc333238.png#clientId=ua6fed7b5-a4a2-4&from=paste&height=104&id=u93a765db&originHeight=104&originWidth=950&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8471&status=done&style=none&taskId=uce9e60b8-da5a-4528-b5b7-50d65524f5a&title=&width=950)
