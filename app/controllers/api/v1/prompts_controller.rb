class Api::V1::PromptsController < ApplicationController

  def index
    current_prompt = user.daily

    render json: current_prompt
  end

  private
  def daily_prompts_params
  end
end
