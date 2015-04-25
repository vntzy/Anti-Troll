require 'sequel'

db_path = "#{File.expand_path(File.dirname(__FILE__))}/../news.db"
DB = Sequel.sqlite(db_path)

puts db_path

def start_crawl(site_name, crawler)
  site_id = DB[:sites].where(name: site_name).first[:id]
  news_dataset = DB[:news]
  comments_dataset = DB[:comments]
  crawler.crawl.each do |entry|
    news_id = news_dataset.insert(entry.news.merge(site_id: site_id))
    entry.comments.each do |comment|
      comments_dataset.insert(comment.merge(news_id: news_id))
    end
  end
end
