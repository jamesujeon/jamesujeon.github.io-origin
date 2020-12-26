require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"


DEPLOY_URL = "git@github.com:jamesujeon/jamesujeon.github.io.git"


desc "Build"
task :build do
  ENV["JEKYLL_ENV"] = "production"

  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end


desc "Build & Deploy"
task :deploy => [:build] do
  Dir.mktmpdir do |tmp|
    pwd = Dir.pwd

    Dir.chdir tmp
    system "git init"
    system "git config user.name jamesujeon"
    system "git config user.email jamesujeon@gmail.com"
    system "git remote add origin #{DEPLOY_URL}"
    system "git pull origin master"

    cp_r pwd + "/_site/.", tmp
    system "git add ."
    system "git commit -m 'Deployed at #{Time.now}'"
    system "git push origin master"

    Dir.chdir pwd
  end
end


desc "Build & Deploy by Force"
task :deploy_by_force => [:build] do
  Dir.mktmpdir do |tmp|
    pwd = Dir.pwd

    cp_r "_site/.", tmp
    Dir.chdir tmp
    system "git init"
    system "git config user.name jamesujeon"
    system "git config user.email jamesujeon@gmail.com"
    system "git remote add origin #{DEPLOY_URL}"
    system "git add ."
    system "git commit -m 'Deployed at #{Time.now}'"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
