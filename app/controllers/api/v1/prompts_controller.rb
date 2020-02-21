class Api::V1::PromptsController < ApplicationController

  def index
    results = PromptsWrapper.retrieve_prompts
    binding.pry

    render json: results
  end

  private
  def daily_prompts_params
  end
end
