import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ReactComponent as Favourites } from "../../../assets/images/profileTooltip/favourites.svg";
import { ReactComponent as Star } from "../../../assets/images/profileTooltip/star.svg";
import { ReactComponent as Settings } from "../../../assets/images/profileTooltip/setiings.svg";
import { ReactComponent as Logout } from "../../../assets/images/profileTooltip/logout.svg";
import { ReactComponent as ArrowBottom } from "../../../assets/images/profileTooltip/arrow-bottom.svg";
import ava from "../../../assets/images/common/ava.svg"
import { Link } from "react-router-dom";
import s from "./profileTooltip.module.css";

interface ProfileTooltipProps {
  isActive: boolean;
}

const ProfileTooltip: React.FC<ProfileTooltipProps> = ({ isActive }) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <div className={`${s.root} ${isActive ? s.active : ""}`}>
      <div className={s.ava}>
        <img src={profile.profile_picture || ava} alt="ava" />
      </div>
      <h2>{profile.name}</h2>
      <span className={s.email}>{profile.email}</span>
      <div className={s.links}>
        <Link to="/favourites" className={s.link}>
          <div className={s.link__flex}>
            <Favourites />
            <span>Избранное</span>
          </div>
          <span>4</span>
        </Link>
        <div className={s.link}>
          <div className={s.link__flex}>
            <Star />
            <span>Акции</span>
          </div>
          <ArrowBottom />
        </div>
        <Link to="/settings" className={s.link}>
          <div className={s.link__flex}>
            <Settings />
            <span>Настройки</span>
          </div>
        </Link>
        <button className={s.link}>
          <div className={s.link__flex}>
            <Logout />
            <span>Выход</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileTooltip;
