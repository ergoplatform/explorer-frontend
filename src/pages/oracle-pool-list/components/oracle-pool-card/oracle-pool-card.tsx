import React from 'react';
import './oracle-pool-card.scss';
import { Link } from 'react-router-dom';

interface Props {
  data: any;
}

const OraclePoolCard = (props: Props) => {
  const { data } = props;

  return (
    <article className="oracle-pool-card">
      <Link
        to={`/oracle-pool-state/${data.key}`}
        className="oracle-pool-card__link"
      >
        <div className="oracle-pool-card__icon">{data.icon}</div>

        <div className="oracle-pool-card__media">{data.icon}</div>

        <div className="oracle-pool-card__header">
          <h3 className="oracle-pool-card__header-title">{data.name}</h3>
          <p className="oracle-pool-card__header-meta">Oracle pool</p>
          <div className="oracle-pool-card__header-icon">
            <svg viewBox="0 0 28 25">
              <path
                fill="#fff"
                d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default OraclePoolCard;
