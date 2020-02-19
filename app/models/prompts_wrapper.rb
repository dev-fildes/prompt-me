class PromptsWrapper
  BASE_URL = "https://www.reddit.com/r/WritingPrompts.json?limit=50&f=flair_name%3A%22Writing%20Prompt%22"

  def initialize(urls)
    @prompt_urls = urls
  end

  def self.retrieve_prompts
    reddit_response = Faraday.get(BASE_URL)
    urls = prompt_urls(reddit_response.body)
    PromptsWrapper.new(urls)
  end

  def self.prompt_urls(prompt_list)
    prompt = JSON.parse(prompt_list)

    prompt_array = prompt["data"]["children"][2..-1].map do |prompts|
       prompts["data"]["title"]
    end
    return prompt_array
  end
end
