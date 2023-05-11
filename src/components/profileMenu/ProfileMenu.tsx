import React, { useState, useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { getProfile } from "../../store/slices/porfileSlice";
import { IProfileMenuItem, profileMenuList } from "../../utillities/utillities";
import { ReactComponent as AccordeonArrow } from "../../assets/images/profile-menu/accordeon-arrow.svg";
import { ReactComponent as Cross } from "../../assets/images/profile-menu/cross.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeadSkeleton from "./ProfileHeadSkeleton";
import s from "./profileMenu.module.css";

interface ProfileMenuItemProps {
  item: IProfileMenuItem;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ item }) => {
  const [isItemsActive, setIsItemsActive] = useState(false);

  const handleIsItemsActive = () => {
    setIsItemsActive((bool) => !bool);
  };

  return (
    <>
      <button onClick={handleIsItemsActive} className={s.link}>
        <span>{item.title}</span>
        <AccordeonArrow
          className={`${s.arrow} ${isItemsActive ? s.active : ""}`}
        />
      </button>
      <ul className={`${s.link__items} ${isItemsActive ? s.active : ""}`}>
        {item.items.map((link, key) => (
          <li key={key} className={s.link__item}>
            <Link to={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

interface ProfileMenuProps {
  isActive: boolean;
  setIsActive: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isActive, setIsActive }) => {
  const dispatch = useAppDispatch();
  const { profile, status } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <section
      onClick={setIsActive}
      className={`${s.back} ${isActive ? s.active : ""}`}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className={s.content}
      >
        <button onClick={setIsActive} className={s.cross}>
          <Cross />
        </button>
        {status === "success" ? (
          <div className={s.head}>
            <div className={s.ava}>
              <img src={profile.ava} alt="ava" />
            </div>
            <h2>
              {profile.name} {profile.surname}
            </h2>
            <span className={s.tel}>{profile.tel}</span>
          </div>
        ) : status === "error" ? (
          "Что-то прозошло не так"
        ) : (
          <ProfileHeadSkeleton />
        )}
        <Link to="/favourites" className={`${s.link} ${s.favourites}`}>
          <span>Избранное</span>
          <span>{profile.favourites}</span>
        </Link>
        <ul>
          {profileMenuList.map((item, key) => (
            <li key={key}>
              <ProfileMenuItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfileMenu;
