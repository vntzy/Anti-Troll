require 'sinatra'
require 'haml'
require_relative '../db'

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
    select_all(:comments).offset(offset).limit(PAGE_SIZE).all
  total_comments = DB[:comments].count
  haml :index, locals: { comments: comments, total_comments: total_comments }
end
