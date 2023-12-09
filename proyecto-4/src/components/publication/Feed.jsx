// import React from 'react'
import avatar from '../../assets/img/avatar.jpg'
// import useAuth from '../../hooks/useAuth';

export const Feed = () => {

    /* const {compartido} = useAuth();
    console.log(compartido);
    */

  return (
    <>
        <header className="content__header">
            <h1 className="content__title">Timeline</h1>
            <button className="content__button">Mostrar nuevas</button>
        </header>

        <div className="content__posts">

            <div className="posts__post">
                <div className="post__container">

                    <div className="post__image-user">
                        <a href="#" className="post__image-link">
                            <img src={avatar}
                            alt="Foto de perfil" className="post__user-image" />
                        </a>
                    </div>

                    <div className="post__body">
                        <div className="post__user-info">
                            <a href="#" className="user-info__name">Jere</a>
                            <span className="user-info__time">
                                | Hace 1 hora
                            </span>
                            <p className="user-info__content">
                                Hola, buenos días.
                            </p>

                            <div className="post__user-delete">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>

                        <div className="post__user-info">
                            <a href="#" className="user-info__name">Jere</a>
                            <span className="user-info__time">
                                | Hace 1 hora
                            </span>
                            <p className="user-info__content">
                                Hola, buenos días.
                            </p>

                            <div className="post__user-delete">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>

                        <div className="post__user-info">
                            <a href="#" className="user-info__name">Jere</a>
                            <span className="user-info__time">
                                | Hace 1 hora
                            </span>
                            <p className="user-info__content">
                                Hola, buenos días.
                            </p>

                            <div className="post__user-delete">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>

                        <div className="post__user-info">
                            <a href="#" className="user-info__name">Jere</a>
                            <span className="user-info__time">
                                | Hace 1 hora
                            </span>
                            <p className="user-info__content">
                                Hola, buenos días.
                            </p>

                            <div className="post__user-delete">
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>

                        <span className="see__more-posts">
                            <button className="btn__see-more-posts">
                                Ver más publicaciones
                            </button>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </>
  );

}
