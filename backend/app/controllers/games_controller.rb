class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find_by_id(params[:id])
        render json: game
    end

    def create 
        user = User.find_or_create_by(user_params)
        game = user.games.build(game_params)
        if user.valid? && game.save
            render json: game
        else
            render json: {error: "Couldn't create that game", status: 400 }
        end
    end

    def update
        game = Game.find_by_id(params(:id))
        if game.update(game_params)
            render json: game
        else
            render json: {error: "Couldn't update that game", status: 400 }
        end
    end

    def destroy
        game = Game.find_by_id(params(:id))
        game.destroy
        render json: game
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end

    def game_params
        params.require(:game).permit(:win)
    end
end
