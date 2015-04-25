require 'sinatra'
require 'haml'
require_relative '../db'

post '/classify' do
  DB[:comment_classifications].insert(params[:comment])
  redirect back
end

get '/:site' do
  comments = DB[:comments].
    left_outer_join(:comment_classifications, comment_id: :id).
    where(comment_classifications__comment_id: nil).all
  haml :index, locals: { comments: comments }
end
