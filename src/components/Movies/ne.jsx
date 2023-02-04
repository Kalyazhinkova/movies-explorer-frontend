const handleSavedCard = (card) => {
  if (card.saved) {
    mainApi.deleteCard(card._id).then(() => {
      setCards((beatCards) => {
        const editedCards = beatCards.map((beatCard) => {
          if (beatCard._id === card._id) {
            beatCard.saved = false;
          }
          return beatCard;
        });
        localStorage.setItem("local-movies", JSON.stringify(editedCards));
        return editedCards;
      });
      localStorage.removeItem("saved-movies");
    });
  } else {
    const recentCard = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${card.image.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    };
    mainApi.savedCard(recentCard).then((serverCard) => {
      setCards((beatCards) => {
        localStorage.removeItem("saved-movies");
        const editedCards = beatCards.map((beatCard) => {
          if (beatCard.id === serverCard.movieId) {
            beatCard.saved = true;
            beatCard._id = serverCard._id;
            beatCard.movieId = serverCard.movieId;
            beatCard.thumbnail = serverCard.thumbnail;
          }
          return beatCard;
        });
        localStorage.setItem("local-movies", JSON.stringify(editedCards));
        return editedCards;
      });
    });
  }
};
