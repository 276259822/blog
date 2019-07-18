### Git配置SSH访问GitHub

#### 1. 检查本机是否有ssh key设置
```
cd ~/.ssh
```
或者
```
cd /Users/用户名/.ssh
```
如果没有则提示：```No such file or directory```
有则进入```~/.ssh```
```ls```查看当前路径文件，```rm *```删除所有文件

#### 2. 生成ssh key
填写真实有效的邮箱地址
```
ssh-keygen -t rsa -C "xxx@xx.com"
```
```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/用户名/.ssh/id_rsa): // 确认路径是否/Users/用户名/.ssh/id_rsa，是则回车
Enter passphrase (empty for no passphrase): // 输入密码(可以为空)
Enter same passphrase again: // 确认密码(可以为空)
Your identification has been saved in /Users/用户名/.ssh/id_rsa. // 生成的密钥
Your public key has been saved in /Users/用户名/.ssh/id_rsa.pub. // 生成的公钥
```
已完成ssh key设置，其存放路径为：```/Users/xxx/.ssh/```

#### 3. 添加ssh key到GitHub
  1. 登录[github](https://github.com/)，进入```Settings -> SSH and GPG keys -> New SSH key```
  2. 进入```/Users/用户名/.ssh/```目录下，打开```id_rsa.pub```文件，全选复制公钥内容。将公钥粘贴到github```SSH keys / Add new```的key输入框，最后```Add SSH key```

#### 4. 查看配置Git帐户
查看Git帐户
```
git config --global --list
```
设置用户名/用户邮箱
```
git config --global user.name "用户名"
git config --global user.email "用户邮箱"
```

#### 5. 测试ssh key是否设置成功
```
ssh -T git@github.com
```
成功则提示：```Hi 用户名! You've successfully authenticated, but GitHub does not provide shell access.```
失败则尝试：
```
ssh-add ~/.ssh/id_rsa
```

> window系统报错处理

执行```ssh-add ~/.ssh/id_rsa```如果提示：```Could not open a connection to your authentication agent.```，则需要先执行```ssh-agent bash```

