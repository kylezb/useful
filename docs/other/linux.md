

# 查看文件句柄数量
```
lsof -p pid | wc -l
```

# 查看目录大小, 查找大文件目录
```
du -h --max-depth=1 /
```

# 创建符号链接和删除符号链接
```
ln -s <path to the file/folder to be linked> <the path of the link to be created>
删除
unlink <path-to-symlink>
即使符号链接是文件夹形式的，也不要在前面加 "/"，如果加了 "/"，Linux 会把它当成是一个目录，然而 unlink 是无法删除目录的。
```