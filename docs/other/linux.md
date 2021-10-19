

# 查看文件句柄数量
```
lsof -p pid | wc -l
```

# 查看目录大小, 查找大文件目录
```
du -h --max-depth=1 /
```