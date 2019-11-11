module Jekyll::CustomFilter
    def remove_index_url(input)
        if input.end_with?("index.html")
            input = input[0..-11]
        end
    end

    def sort_tags_by_post_count(tags)
        max_post_count = tags.max_by { |k, v| v.size }[1].size
        return tags.sort_by { |x| [max_post_count - x[1].size, x[0].downcase] }
    end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
