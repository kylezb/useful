# Android 正向开发的一些东西
## sourceSet 通过修改SourceSets中的属性，可以指定哪些源文件（或文件夹下的源文件）要被编译，哪些源文件要被排除。
```
    在使用AndServer 的时候有使用这个参数，在module的gradle中加入jniLibs
    android {
    sourceSets {
        main {
            manifest.srcFile 'AndroidManifest.xml'
            java.srcDirs = ['src']
            resources.srcDirs = ['src']
            aidl.srcDirs = ['src']
            renderscript.srcDirs = ['src']
            res.srcDirs = ['res']
            assets.srcDirs = ['assets']
            jniLibs.srcDirs = ['libs']
        }

}
```
## 给控件添加ID后访问
```
    //activity_main.xml 中添加ID
    <TextView
        android:id="@+id/textView"  // 添加ID
        .....
    />
    
    // 获取控件
    TextView testview = findViewById(R.id.textView);
```
## 指定启动的Application
```
    // manifest 文件中修改
    <application
        android:name=".MyApp"
        ...
    />

    
```
## Hardcoded string should use @string resource 警告
```
    在布局文件中，文本的设置使用如下写法时会有警告：Hardcoded string "下一步", should use @string resource

    <Button
            android:id="@+id/button1"
            android:layout_width="118dp" 
            android:layout_height="wrap_content"
            android:text="下一步" />
    虽然可以正常运行，但是这不是一个好习惯，应该在res/values/strings.xml中设置：

    <?xml version="1.0" encoding="utf-8"?>
    <resources>
    <string name="message">下一步</string>
    </resources>
    引用的时候使用

    android:text="@string/message"
    就行了。这样做可以做到一改全改，在支持多语言时也是很有用的。另外，颜色的设置也最好在color.xm中类似设置。

```


# 给控件添加点击事件
## XML布局文件中设置回调方法
```
    1. 添加onClick属性

    <Button
        ***
        android:onClick="operator" 
    />

    2. 然后会出错，右键fix，点击create *** in MainActivity


```


# Server(是一个一种可以在后台执行长时间运行操作而没有用户界面的应用组件)
## 2种状态
```
    1. 启动状态
        当应用组件（如 Activity）通过调用 startService() 启动服务时，服务即处于“启动”状态。一旦启动，服务即可在后台无限期运行，即使启动服务的组件已被销毁也不受影响，除非手动调用才能停止服务， 已启动的服务通常是执行单一操作，而且不会将结果返回给调用方。

    2. 绑定状态
        当应用组件通过调用 bindService() 绑定到服务时，服务即处于“绑定”状态。绑定服务提供了一个客户端-服务器接口，允许组件与服务进行交互、发送请求、获取结果，甚至是利用进程间通信 (IPC) 跨进程执行这些操作。 仅当与另一个应用组件绑定时，绑定服务才会运行。 多个组件可以同时绑定到该服务，但全部取消绑定后，该服务即会被销毁。 
```
## 在manifest中的写法
```

    <service android:enabled=["true" | "false"]
        android:exported=["true" | "false"]
        android:icon="drawable resource"
        android:isolatedProcess=["true" | "false"]
        android:label="string resource"
        android:name="string"
        android:permission="string"
        android:process="string" >
        . . .
    </service>


    //ok
    <service
            android:name=".Service.MyService"
            android:enabled="true"
            android:exported="true"
            >
    </service>

```

# 申请权限
```
    写在manifest的 application同级目录
    
    <uses-permission android:name="android.permission.INTERNET" />


```


