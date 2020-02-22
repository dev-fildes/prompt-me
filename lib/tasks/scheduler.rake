namespace :reset do
  desc "This task is called by the Heroku scheduler add-on"
  task :daily_prompts => :environment do
    puts "Updating prompts..."
    results = PromptsWrapper.retrieve_prompts
    puts "Shuffling prompts.."
    users = User.all
    puts "Gathering all the users.."
    users.each do |user|
      user.update_attributes(daily: results.sample(5))
    end
    puts "Daily prompts updated!"
  end
end
