require 'forwardable'
require 'mechanize'
require_relative 'crawler'

class ShortCrawler < Crawler
  extend Forwardable

  def_delegators :@extractor,
    :initial_urls, :next_page, :blocks, :news, :comments

  PAGES_LIMIT = 2

  def all_blocks
    all_start_pages = initial_urls.map { |url| @agent.get(url) }.flatten
    collected_pages = 0
    all_start_pages.each do |page|
      url_pages    = [page]
      current_page = page

      while !current_page.nil?  && collected_pages < PAGES_LIMIT
        url_pages << current_page
        collected_pages += 1
        current_page = @agent.get(next_page(page))
      end

      url_pages.each do |url_page|
        blocks(url_page).each { |block| yield block }
      end
    end
  end

  def crawl
    entries = []

    all_blocks do |block|
      entries << CrawlEntry.new(news(block), comments(block))
    end

    entries
  end

  CrawlEntry = Struct.new(:news, :comments)
end
