Store.js

```
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);
```

epics.js


```

```



**可观察流与自动响应**

**可观察流相当于一个**发射器**，它能够随时间地流逝不断 **发送/产生** 各种各样的值，当我们**监听**这个发射器时，就会收到发射过来的值并可以执行我们想要的操作。而启动这个**监听**，需要触发 .subscribe( ) 。每当有一个新值发送时，subscribe里的代码就会自动执行 —— 自动响应。



**Epics函数**

**redux-observable里的Epics函数主要作用是：1. **传进一个action，然后return一个新的、不一样的action**。2. 这个Epics函数是一个发射器，因此我们能够subscribe它，从而可以监听并收到新的action。3. 每当我们调用redux的dispatch的时候，所有的Epics函数都会执行。



**redux-observable的内部原理**

　　　　　　 ( 1 ) 每当我们使用redux的dispatch的时候，每个Epics函数都会收到我们所dispatch的action，然后Epics函数返回一个新的action。

　　　　　　（2）监听Epics函数，将它返回的新的action，用来dispatch，从而更新应用状态