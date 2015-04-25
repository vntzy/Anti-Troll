require 'sinatra'
require 'haml'
require_relative '../db'

post '/classify' do
  DB[:comment_classifications].insert(params[:comment])
  redirect back
end

get '/:site' do
  comments = DB[:comments].all
  haml :index, locals: { comments: comments }
end
