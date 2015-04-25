class Crawler
  extend Forwardable

  def_delegators :@extractor,
    :initial_urls, :next_page, :news_urls, :news, :comments

  def initialize(site_extractor)
    @agent = Mechanize.new
    @extractor = site_extractor
  end

  def site_news_urls
    initial_urls.map { |url| news_urls(agent.get(url)) }
  end

  def crawl
    site_news_urls.map do |url|
      news_page = @agent.get(url)
      CrawlEntry.new(news(news_page), comments(news_page))
    end
  end

  CrawlEntry = Struct.new(:news, :comments)
end
