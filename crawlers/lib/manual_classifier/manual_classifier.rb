require 'sinatra'
require 'haml'
require 'json'
require_relative '../db'

# run in the local network
set :bind, '0.0.0.0'

post '/classify' do
  DB[:comment_classifications].insert(params[:comment])
  redirect back
end

PAGE_SIZE = 100

get '/:site/:page' do
  offset = (params[:page].to_i || 0) * PAGE_SIZE
  comments = DB[:comments].
    join(:news, id: :news_id).
    join(:sites, id: :news__site_id).
    where(sites__name: params[:site]).
    left_outer_join(:comment_classifications, comment_id: :comments__id).
    where(comment_classifications__comment_id: nil).
    order(:news__id).select_all(:comments).select_append(:news__body___news).
    offset(offset).limit(PAGE_SIZE)
  total_classified_comments = DB[:comment_classifications].count
  total_comments = DB[:comments].count
  haml :index, locals: {
    sql: comments.sql,
    comments: comments.all,
    total_comments: total_comments ,
    total_classified_comments: total_classified_comments
  }
end

get '/training_set' do
  content_type 'application/json'
  DB[:comments].join(:comment_classifications, comment_id: :comments__id).
    select(:comments__body, :comment_classifications__rating).to_a.to_json.to_s
end
