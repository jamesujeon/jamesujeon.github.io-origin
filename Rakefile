require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"


DEPLOY_URL = "https://github.com/jamesujeon/jamesujeon.github.io.git"


desc "Build"
task :build do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site",
    "mode"        => "production"
  })).process
end


desc "Build & Deploy"
task :deploy => [:build] do
  Dir.mktmpdir do |tmp|
    pwd = Dir.pwd

    cp_r "_site/.", tmp
    Dir.chdir tmp
    system "git init"
    system "git add ."
    system "git commit -m 'Deploy site'"
    system "git remote add origin #{DEPLOY_URL}"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
