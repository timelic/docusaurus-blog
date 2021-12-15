首先新建项目

```
rails new PROJECT
```

启动服务器

```
ruby bin/rails server
或者
rails s
```

> 不能启动的一个原因是缺少`webpacker.yml`。复制到`config/`下。

新建一个controller，比如叫`welcome`。包括一个路由，和一个index页面

```
ruby bin/rails generate controller welcome index
```

> 这时候是无法访问的。需要删掉`app/views/layouts/application.html.erb`中的`media: 'all', 'data-turbolinks-track': 'reload'`。把js注释掉。

新建到的controller的页面在`app/views/welcome`，路由在

---

接下来配置全局路由`config/routes.rb`

```ruby
Rails.application.routes.draw do
  root "welcome#index" # 根页面是welcome下的index
  get "welcome/index" # 让index页面可以访问
  get "/welcome", to: "welcome#index" # 访问welcome转发到下面的index
end
```

> 注意必须用双引号。单引号可能出错。

---

### 一个博客demo

首先创建一个`resources`，约等于一套集成的路由参数。

在全局路由中加入

```
resources :articles
```

这样子在路由中有了隐藏的`restful actions`

```ruby
$ bin/rake routes
      Prefix Verb   URI Pattern                  Controller#Action
    articles GET    /articles(.:format)          articles#index
             POST   /articles(.:format)          articles#create
 new_article GET    /articles/new(.:format)      articles#new
edit_article GET    /articles/:id/edit(.:format) articles#edit
     article GET    /articles/:id(.:format)      articles#show
             PATCH  /articles/:id(.:format)      articles#update
             PUT    /articles/:id(.:format)      articles#update
             DELETE /articles/:id(.:format)      articles#destroy
        root GET    /                            welcome#index
```

新建一个controller，来操作文章。页面显示在`app/views`，逻辑在`app/controllers`

```
ruby bin/rails g controller articles
```

在`app/controllers/articles_controller.rb`，里面建立`new`方法，对应于`URL/articles/new`页面的逻辑

```
class ArticlesController < ApplicationController
    def new
    end
end
```

现在没有页面，所以在`app/views/`下建立`new.html.erb`。

```erb
<%= form_for :article, url: articles_path do |f| %>
  <p>
    <%= f.label :title %><br>
    <%= f.text_field :title %>
  </p>
 
  <p>
    <%= f.label :text %><br>
    <%= f.text_area :text %>
  </p>
 
  <p>
    <%= f.submit %>
  </p>
<% end %>
```

```
<%写逻辑脚本(Ruby语法)%>
<%=直接输出变量值或运算结果%>
```

> 這裡的 `articles_path` helper 會告訴 Rails 要把表單指向 Prefix 為 `articles` 的 URI Pattern ；而且表單預設是使用 `POST` 來發送請求到這個 route ，最後可推得由目前 `ArticlesController` controller 的 `create` action 來處理請求。

> 这里的确难理解。

接着编写`controller`的`create`方法来接收。

```
def create
    render plain: params[:article].inspect
end
```



建立一个`Model`，也就是数据库。

```
ruby bin/rails generate model Article title:string text:text
```

这时候将新建`db/migrate/xxx.rb`

然后需要用`ruby bin/rake db:migrate`来执行`migration`操作。

> 并不明白有什么意义。似乎是建立了schema

---

```
一般小写字母、下划线开头：变量（Variable）。
$开头：全局变量（Global variable）。
@开头：实例变量（Instance variable）。
@@开头：类变量（Class variable）类变量被共享在整个继承链中
大写字母开头：常数（Constant）。
```

---

修改`create`方法。

```ruby
def create
    @article = Article.new(params[:article]) # 新建了一个数据库的列
    @article.save # 调用存储方法
    redirect_to @article # 将页面重定向这个article
end
```

由于安全规则，现在把它写成如下形式

```ruby
def create
  @article = Article.new(article_params)
  @article.save
  redirect_to @article
end
 
private
  def article_params
    params.require(:article).permit(:title, :text)
  end
```

由于`create`之后会隐式调用`show`方法。所以编写它并且新建`show`页面

```
def show
    @article = Article.find(params[:id])
end
```

```
<p>
  <strong>Title:</strong>
  <%= @article.title %>
</p>
 
<p>
  <strong>Text:</strong>
  <%= @article.text %>
</p>
```



接下来做页面跳转

从`index`跳到`new`

```
<%= link_to 'New article', new_article_path %>
```

从`new`跳到`index`

```
<%= link_to 'Back', articles_path %>
```

---

表单验证

`app/models/article.rb`

```ruby
class Article < ActiveRecord::Base
  validates :title, presence: true,
                    length: { minimum: 5 }
end
```

然后修改`create`方法

```
  if @article.save
    redirect_to @article
  else
    render 'new'
  end
```

