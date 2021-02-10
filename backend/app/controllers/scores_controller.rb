class ScoresController < ApplicationController

    def index
        scores = Score.all
        render json: scores
    end
    
    def show
        score = Score.find_by_id(params[:id])
        render json: score
    end

    def create 
      user   = User.find_by_name(params[:username])
      if params[:status].split("<span>")[1].present?
        lose = 1
      else
        win    = params[:status] == '× has won!' ?  1 : 0
        lose   = 0
        draw   = params[:status] == 'Game is tied!' ? 1 : 0
      end
      if !user.present?
        user = User.create(name: 'no name')
      end

    #   Updating the users score board
      user.scores.create(wins: win, loses: lose, draws: draw)
      user.games.create(win: win)
      total_wins = user.scores.where(wins: 1).count
      total_loses = user.scores.where(loses: 1).count
      total_draw = user.scores.where(draws: 1).count
      render json: {name: user.name, total_draw: total_draw, total_loses: total_loses, total_wins: total_wins, total_games: user.games.count }
    end

    def update
        score = Score.find_by_id(params(:id))
        if score.update(score_params)
            render json: score
        else
            render json: {error: "Couldn't update that score", status: 400 }
        end
    end

    def destroy
        score = Score.find_by_id(params(:id))
        score.destroy
        render json: score
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end

    def score_params
        params.require(:score).permit(:wins, :loses, :draws)
    end
end
