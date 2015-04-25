require 'forwardable'
require 'mechanize'

class Crawler
  extend Forwardable

  def_delegators :@extractor,
    :initial_urls, :next_page, :news_urls, :news, :comments

  def initialize(site_extractor)
    @agent = Mechanize.new
    @extractor = site_extractor
  end

  def first_100_pages(initial_url)
    i = 0
    page = @agent.get(initial_url)
    pages = [initial_url]
    while !next_page(page).nil? && (i < 100) do
      page = @agent.get(next_page(page))
      pages.push page.uri.to_s
      i += 1
    end
    pages
  end

  def site_news_urls
    all_start_pages = initial_urls.map { |url| first_100_pages(url) }.flatten
    all_start_pages.map { |url| news_urls(@agent.get(url)) }.flatten
  end

  def crawl
    site_news_urls.map do |url|
      news_page = @agent.get(url)
      CrawlEntry.new(news(news_page), comments(news_page))
    end
  end

  CrawlEntry = Struct.new(:news, :comments)
end
