require 'json'

class FacebookExtractor
  def initial_urls
    token = File.read('fb.token').strip
    ["https://graph.facebook.com/v2.3/178139872222344/feed?access_token=#{token}"]
  end

  def next_page(page)
    JSON.parse(page.body)['paging']['next']
  end

  def blocks(page)
    if page.class == String
      puts "PAGE SHIT #{page}"
    end
    JSON.parse(page.body)['data'].select do |block|
      block['type'] == 'status'
    end.tap { |x| puts "BLOCKS SIZE #{x.map(&:inspect).join("\n")}" }
  end

  def news(block)
    article_id = block['id'][/\d+$/]
    {
      name: block['from']['name'],
      url: "https://www.facebook.com/groups/178139872222344/permalink/#{article_id}/" ,
      body: block['message'],
    }
  end

  def comments(block)
    puts block.inspect
    (block['comments'] || {'data' => []})['data'].map do |comment_block|
      {
        author: comment_block['from']['name'],
        body: comment_block['message'],
        upvotes: comment_block['like_count'],
        downvotes: 0,
      }
    end
  end
end
