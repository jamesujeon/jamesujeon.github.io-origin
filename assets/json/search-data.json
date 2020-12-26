---
layout: none
---
[
  {% for post in site.posts %}
    {
      "title"      : {{ post.title | jsonify }},
      "categories" : "{{ post.categories | join: ' > ' }}",
      "tags"       : "{{ post.tags | join: ', ' }}",
      "date"       : "{{ post.date | date: '%Y.%m.%d' }}",
      "urlString"  : "{{ post.url }}",
      "url"        : "{{ post.url | prepend: site.baseurl }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]