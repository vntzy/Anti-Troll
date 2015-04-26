require 'iconv'

class DnevnikExtractor
  def initial_urls
    [
  'http://www.dnevnik.bg/search.php?stext=%D0%B1%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F&rubrid=0&searchinto=0&sort=0&fromdate=1%2F2%2F2014&todate=24%2F4%2F2015&tAction=%D0%A2%D1%8A%D1%80%D1%81%D0%B5%D0%BD%D0%B5&backurl=&selfurl=&kfor_name=ssearch'
  ]
  end

  def next_page(page)
    @domain = "http://www.dnevnik.bg/search.php"
    @domain + page.link_with(:text => '»').href unless page.link_with(:text => '»').nil?
  end

  def news_urls(page)
    @domain = "http://www.dnevnik.bg/"
    blocks = page.search('.archive')
    blocks.map{|b| @domain + b.search('h3 a').attr('href').value}
  end

  def news(page)
    {
      body: page.search('.article').children.select{|c| c.name == "text"}.map(&:text).join(' ').gsub(/\s+/,' '),
      name: page.search('.aritcleHead h2').text,
      url:  page.uri.to_s
    }
  end

  def comments(page)
    comments = page.search('#comments > table')
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
  def clean(str)
    @iconv ||= Iconv.new('UTF-8//IGNORE', 'UTF-8')
    @iconv.iconv(str)
  end

  def author(comment)
    clean(comment.search('.user h4').text)
  end

  def body(comment)
    clean(comment.search('.cmntTxtHolder').text).gsub(/\s+/,' ')
  end

  def upvotes(comment)
    clean(comment.search('.cmntusrvotes').text)[/(?<=\+)\d+/].to_i
  end

  def downvotes(comment)
    clean(comment.search('.cmntusrvotes').text)[/(?<=\-)\d+/].to_i
  end
end
