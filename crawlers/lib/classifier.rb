require_relative './db.rb'
require 'json'

module Classifier
  def print
    DB[:comments].join(:comment_classifications, :comment_id => :id).all[1500..-1].each do |comment|
      if classify(comment, troll_wc, normal_wc) != 'Normal'
        p "#{classify(comment, troll_wc, normal_wc)} , #{state(comment)}"
      end
    end
  end

  def tokenize(string)
    string.downcase.gsub(/[^a-zа-я\s]/i, '').gsub(/\s+/,' ').split(' ').reject{|word| word.size < 3}
  end

  def word_count(string)
    words = tokenize(string)
    wf = Hash[words.group_by { |w| w }.map { |w, ws| [w, ws.length] }]
  end

  def state(comment)
    (comment[:rating] != 0) ? 'Troll' : 'Normal'
  end

  def classify(comment, troll_wc, normal_wc)
    words = tokenize(comment[:body])
    p_troll = 0
    p_normal = 0
    words.select{|word| word.size > 5}.each do |word|
      total_mentions = troll_wc[word] + normal_wc[word]
      p_troll += Math.log((troll_wc[word] + 1) / (total_mentions+2.0))
      p_normal += Math.log((normal_wc[word] + 1) / (total_mentions+2.0))
    end
    "#{p_troll} #{p_normal}"
    (p_troll > p_normal) ? 'Troll' : 'Normal'
  end


  def calculate_word_count
    normal_wc = Hash.new(0)
    troll_wc = Hash.new(0)

    trolls = DB[:comments].join(:comment_classifications, :comment_id => :id).where(:rating => 1).all
    super_trolls = DB[:comments].join(:comment_classifications, :comment_id => :id).where(:rating => 2).all
    DB[:comments].join(:comment_classifications, :comment_id => :id).all.each do |comment|
      wc = word_count(comment[:body])
      if comment[:rating] == 0
        normal_wc = normal_wc.merge(wc) { |key, old_val, new_val| old_val + new_val }
      elsif comment[:rating] == 1
        troll_wc = troll_wc.merge(wc) { |key, old_val, new_val| old_val + new_val }
      else
        troll_wc = troll_wc.merge(wc) { |key, old_val, new_val| old_val + 2*new_val }
      end
    end

    [normal_wc, troll_wc]
  end

  def json_dump
    normal_word_count, troll_word_count = calculate_word_count
    {
      normal_wc: normal_word_count,
      troll_wc:  troll_word_count
    }.to_json
  end

  extend self
end
