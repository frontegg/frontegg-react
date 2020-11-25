import React, { useState, useEffect, FC } from 'react';
import { prefixCls } from './constants';
import { api } from '@frontegg/rest-api';
import GoogleMapReact from 'google-map-react';
import { CellComponent, Popup, Loader } from '@frontegg/react-core';

export interface AuditsTableIpAdressState {
  loading: boolean;
  data: {
    latitude: number;
    longitude: number;
    city: string | null;
    country_name: string | null;
    country_code: string | null;
    zip: string | null;
    location: {
      country_flag?: string | null;
      country_flag_emoji?: string | null;
    };
  };
}

const defaultCenter = {
  lat: 40.73061,
  lng: -73.935242,
};

const MapMark = () => <div className={`${prefixCls}__ipCell-mapMark`} />;

export const AuditsTableIpCell: FC<CellComponent | any> = (props) => {
  const [state, setState] = useState<AuditsTableIpAdressState>({
    loading: false,
    data: {
      latitude: 0,
      longitude: 0,
      city: null,
      country_name: null,
      country_code: null,
      zip: null,
      location: { country_flag: undefined, country_flag_emoji: undefined },
    },
  });

  useEffect(() => {
    loadIpAddressMetadata();
  }, []);

  const loadIpAddressMetadata = async () => {
    try {
      setState({ ...state, loading: true });
      const data = await api.metadata.getIpAdressMetadata(props.value);
      setState({ data: data, loading: false });
    } catch (e) {
      console.log('failed to load metadata for ip address - ', e);
    }
  };

  const { data, loading } = state;

  const renderItems = (key: string) => {
    const { data } = state;
    switch (key) {
      case 'city':
        return (
          <div key={key} className='fe-dflex fe-dflex-space-between'>
            <span className={`${prefixCls}__ipCell-item`}>
              <p className={`${prefixCls}__ipCell-item-name`}>City</p>
              <p className={`${prefixCls}__ipCell-item-desc`}>{data[key] ?? 'unknown'}</p>
            </span>
            <span className={`${prefixCls}__ipCell-item`}>
              <p className={`${prefixCls}__ipCell-item-name`}>Zip</p>
              <p className={`${prefixCls}__ipCell-item-desc`}>{data.zip ?? 'unknown'}</p>
            </span>
          </div>
        );
      case 'latitude':
        return (
          <span key={key} className={`${prefixCls}__ipCell-item`}>
            <p className={`${prefixCls}__ipCell-item-name`}>Latitude, Longitude</p>
            <p className={`${prefixCls}__ipCell-item-desc fe-mb-0`}>
              {data.latitude ? `${data.latitude.toFixed(4)},` : 'unknown'}
              {data.longitude ? data.longitude.toFixed(4) : ''}
            </p>
          </span>
        );
      case 'country_name':
        return (
          <span key={key} className={`${prefixCls}__ipCell-item`}>
            <p className={`${prefixCls}__ipCell-item-name`}>Country</p>
            <p className={`${prefixCls}__ipCell-item-desc`}>{data[key] ?? 'unknown'}</p>
          </span>
        );
      default:
        return;
    }
  };

  return (
    <Popup
      action='click'
      trigger={
        <div className={`${prefixCls}__ipCell`}>
          <div className={`${prefixCls}__ipCell-countryFlag`}>
            {loading ? <Loader size={15} /> : data.location.country_flag_emoji ?? ''}
          </div>
          <div className={`${prefixCls}__ipCell-ipAddress`}>{props.value}</div>
        </div>
      }
      content={
        <div className={`${prefixCls}__ipCell-window`}>
          <div className={`${prefixCls}__ipCell-window-title`}>IP ADDRESS {props.value}</div>
          <div className={`${prefixCls}__ipCell-window-container fe-dflex-space-between`}>
            <div className={`${prefixCls}__ipCell-window-info`}>
              {Object.keys(data).map((key) => {
                return renderItems(key);
              })}
            </div>
            <div className={`${prefixCls}__ipCell-window-map`}>
              {data && (
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyC588_3ox-RV9tt46VXdRkaPpSSZbSDAfE' }}
                  defaultCenter={{
                    lat: data.latitude ? data.latitude : defaultCenter.lat,
                    lng: data.longitude ? data.longitude : defaultCenter.lng,
                  }}
                  defaultZoom={data.longitude ? 11 : 0}
                >
                  {data.longitude && (
                    <MapMark
                      //@ts-ignore
                      lat={data.latitude ? data.latitude : defaultCenter.lat}
                      lng={data.longitude ? data.longitude : defaultCenter.lng}
                    />
                  )}
                </GoogleMapReact>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};
