---
title: Operating System Learning
description: Convince and Efficiencytypeslinux | ubantu | macOS | windows | AndroidsourcesCPU、Memory、I/O devicesHow to WorkAll controllers and CPU are sharing m...
pubDate: 2023-06-20T04:14:51.000Z
heroImage: https://cdn.nlark.com/yuque/0/2023/png/1105483/1687235589908-e5629883-eb00-4419-9919-df37e4e5cfd7.png
---

## Convince and Efficiency

### types
linux | ubantu | macOS | windows | Android


### sources
CPU、Memory、I/O devices


## How to Work
All controllers and CPU are sharing memory(RAM), can execute concurrently competing for the memory cycle.

—— To ensure orderly access to the shared memory, a memory controller is provided whose function is to synchronize access to memory.<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1687235589908-e5629883-eb00-4419-9919-df37e4e5cfd7.png#averageHue=%230d1d1b&clientId=ubce82fac-3da0-4&from=paste&height=1012&id=u80f3ea67&originHeight=1012&originWidth=1816&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1032036&status=done&style=none&taskId=u677223e1-7e3d-4c5c-95d6-7c0bff52f56&title=&width=1816)


## Terms

1. Boostrap Program - 引导程序
   1. The initial program that runs when a computer is powered up or rebooted
   2. It is stored in the ROM
   3. It must know how to load the OS and start executing the system
   4. It must locate and load into memory the OS kernel
2. Interrupt - 中断
   1. The occurence of an event is ususally signaled by an interrupt form the hardware or the software
   2. hardware may trigger an interrupt at any time by sending a signal to the CPU, usually by the way of the system bus.
3. System Call(Monitor Call) - 系统调用(监控调用)
   1. Software may trigger an interrupt by executing a special operation called System Call 

When the CPU is interrupted
> 当中断发生时，CPU将其执行转移到中断服务程序，中断结束后，CPU会恢复它原来的执行

1. stop what it is doing and immediately transfers execution to a fixed location(contains the starting address where the Service Routine of the interrupt is located)
2. The Interrupt Service Routine executes
3. On completion, the CPU resumes the interrupted computation.


## Storage Structure
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1687237289635-04765bb9-5389-419e-bccd-29a126d42dd8.png#averageHue=%23071917&clientId=ubce82fac-3da0-4&from=paste&height=990&id=u2944a517&originHeight=990&originWidth=1730&originalType=binary&ratio=1&rotation=0&showTitle=false&size=416610&status=done&style=none&taskId=uae6a2c87-3549-4c98-b8d7-9274e5df99c&title=&width=1730)<br />Registers - 寄存器, store data in bits that means in 0 or 1<br />Cache - 缓存 a little bigger and slowly than registers<br />Main Memory - 主内存 random access memory or RAM<br />Electron Disk - 电子磁盘<br />Magnetic Disk - 磁盘<br />Optical Disk - 光盘<br />Magnetic Tapes - 磁带


## Input/Output Devices
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1687238109423-21eab625-1689-4474-943b-05f72452a590.png#averageHue=%230a1c1a&clientId=ubce82fac-3da0-4&from=paste&height=990&id=u2d387dfa&originHeight=990&originWidth=1718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1200875&status=done&style=none&taskId=ub9b1f032-b783-4a54-bbf2-bc79f10da39&title=&width=1718)

-> The divice controller maintains tow things

- local buffer storage 本地缓冲存储
- set of special-purpose registers 专用寄存器组 

-> Typically, operating system have a device driver(设备驱动程序) for each device controller<br />-> This device driver understands the device controller and presents a uniform interface to the device to the reset of the operating system


### I/O Operation
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1687240122033-51e57223-2c56-41c2-8b61-76ffa282bc08.png#averageHue=%230f2220&clientId=ubce82fac-3da0-4&from=paste&height=1030&id=uf12e6a1e&originHeight=1030&originWidth=1828&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1453683&status=done&style=none&taskId=u6641088a-656e-4890-b7cb-63197d6cfee&title=&width=1828)

- To start an I/O operation, the device driver loads the appropriate registers within the device controller(设备驱动)
- <br />
