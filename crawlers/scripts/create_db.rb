require 'sequel'

db_path = "#{File.expand_path(File.dirname(__FILE__))}/../news.db"
DB = Sequel.sqlite(db_path)

DB.create_table :sites do
  primary_key :id
  String  :name
  String  :url
end

DB.create_table :news do
  primary_key :id
  String  :name
  String  :url
  String  :body
  foreign_key :site_id, :sites
end

DB.create_table :comments do
  primary_key :id
  String   :author
  String   :body
  Integer  :upvotes
  Integer  :downvotes
  foreign_key :news_id, :news
end

DB.create_table :comment_classifications do
  primary_key :id
  Integer :rating
  foreign_key :comment_id, :comments
end
