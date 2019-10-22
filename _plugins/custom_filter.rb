module Jekyll::CustomFilter
    def remove_index_url(input)
        if input.end_with?("index.html")
            input = input[0..-11]
        end
    end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
