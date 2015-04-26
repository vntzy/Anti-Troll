# TODO: ALL CAPS?
require_relative './db.rb'
def tokenize(string)
  string.downcase.gsub(/[^a-zа-я\s]/i, '').gsub(/\s+/,' ').split(' ')
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

# priors = {
#   'troll' => 0.2,
#   'normal' => 0.8
# }

normal_wc = Hash.new(0)
troll_wc = Hash.new(0)

trolls = DB[:comments].join(:comment_classifications, :comment_id => :id).where(:rating => 1).all
super_trolls = DB[:comments].join(:comment_classifications, :comment_id => :id).where(:rating => 2).all
DB[:comments].join(:comment_classifications, :comment_id => :id).all[0..1500].each do |comment|
  wc = word_count(comment[:body])
  if comment[:rating] == 0
    normal_wc = normal_wc.merge(wc) { |key, old_val, new_val| old_val + new_val }
  elsif comment[:rating] == 1
    troll_wc = troll_wc.merge(wc) { |key, old_val, new_val| old_val + new_val }
  else
    troll_wc = troll_wc.merge(wc) { |key, old_val, new_val| old_val + 2*new_val }
  end
end

DB[:comments].join(:comment_classifications, :comment_id => :id).all[1500..-1].each do |comment|
  if classify(comment, troll_wc, normal_wc) != 'Normal'
    p "#{classify(comment, troll_wc, normal_wc)} , #{state(comment)}"
  end
end



all_words = (normal_wc.keys + troll_wc.keys).uniq
max_proportion = 0
max_word = ''
# all_words.each do |word|
#   if ((troll_wc[word]) / (normal_wc[word].to_f + troll_wc[word])) > 0.5 && (troll_wc[word] + normal_wc[word]) > 3
#     max_proportion = ((troll_wc[word]) / (normal_wc[word].to_f + troll_wc[word]))
#     p max_proportion
#     p word
#   end
# end

# p all_words.sort_by { |word| troll_wc[word] + normal_wc[word] }.first(100)
# p troll_wc['например']
# p normal_wc['например']

