class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end
    
    def show
        user = User.find_by_id(params[:id])
        render json: user
    end

    def create 
      if params[:username].length > 0
          user = User.find_or_create_by(name: params[:username])
      else
          user = User.create(name: "no name")
      end
    #   Reteriving users games information from database
      total_wins = user.scores.where(wins: 1).count
      total_loses = user.scores.where(loses: 1).count
      total_draw = user.scores.where(draws: 1).count
      render json: {name: user.name, total_draw: total_draw, total_loses: total_loses, total_wins: total_wins, total_games: user.games.count }
    end

    def update
      user = User.find_by_name(params[:username])
      if user.update(name: params[:new_name])
        total_wins = user.scores.where(wins: 1).count
        total_loses = user.scores.where(loses: 1).count
        total_draw = user.scores.where(draws: 1).count
        render json: {name: user.name, total_draw: total_draw, total_loses: total_loses, total_wins: total_wins, total_games: user.games.count }
        else
            render json: {error: "Couldn't update that user", status: 400 }#, status 400
        end
    end

    def destroy
        user = User.find_by_name(params[:username])
        r = user.destroy
        render json: { }
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
