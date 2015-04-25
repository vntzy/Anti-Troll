class OffnewsExtractor
  def initial_urls
    [
  'http://offnews.bg/news/%D0%9D%D0%BE%D0%B2%D0%B8%D0%BD%D0%B8_2/'
  ]
  end

  def next_page(page)
    @domain = "http://offnews.bg/news/%D0%9D%D0%BE%D0%B2%D0%B8%D0%BD%D0%B8_2/"
    @domain + page.search('a.next').attr('href').value unless page.search('a.next').empty?
  end

  def news_urls(page)
    @domain = "http://offnews.bg/"
    blocks = page.search('.cat_list_s_int')
    blocks.map{|b| @domain + b.search('h2 a').attr('href').value}
  end

  def news(page)
    {
      body: page.search('.news_text').text,
      name: page.search('h1').text,
      url:  page.uri.to_s
    }
  end

  def comments(page)
    comments = page.search('.comment_box_int')
    comments.map do |comment|
      {
        author: author(comment),
        body: body(comment),
        upvotes: upvotes(comment),
        downvotes: downvotes(comment)
      }
    end
  end

  private
  def author(comment)
    comment.search('span.comment_name').text
  end

  def body(comment)
    comment.search('.comment_text').text.gsub(/\s+/,' ').sub(/\+ \d+ - \d+/i,'')
  end

  def upvotes(comment)
    comment.search('.vote_up').text.gsub(/\s+/,'').to_i
  end

  def downvotes(comment)
    comment.search('.vote_down').text.gsub(/\s+/,'').to_i
  end
end
