class CrawlerExtractor
  def initial_urls
  end

  def next_page(page)
  end

  def news_urls(page)
  end

  def news(page)
    # {
    #   name:, url:, body:
    # }
  end

  def comments(page)
    # [{
    #     author:, body:, upvotes:,downvotes:,
    # }]
  end
end
