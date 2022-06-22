import React, { useState, useEffect, FC, useRef } from 'react';
import { prefixCls } from './constants';
import { api } from '@frontegg/rest-api';
import GoogleMapReact from 'google-map-react';
import { CellComponent, Popup, Loader, Icon } from '@frontegg/react-core';

export interface AuditsTableIpAddressState {
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
  const popupRef = useRef<any>(null);
  const [state, setState] = useState<AuditsTableIpAddressState>({
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

  const loadIpAddressMetadata = async () => {
    try {
      setState({ ...state, loading: true });
      // @ts-ignore
      if (!window.cacheIps) {
        // @ts-ignore
        window.cacheIps = {};
      }
      // @ts-ignore
      const data: any = window.cacheIps?.[props.value];
      if (data) {
        setState({ data, loading: false });
        return;
      }
      const ipData = await api.metadata.getIpAdressMetadata(props.value);
      // @ts-ignore
      window.cacheIps[props.value] = ipData;
      setState({ data: ipData, loading: false });
    } catch (e) {
      console.log('failed to load metadata for ip address - ', e);
      setState({
        data: {
          latitude: 0,
          longitude: 0,
          city: null,
          country_name: null,
          country_code: null,
          zip: null,
          location: { country_flag: undefined, country_flag_emoji: undefined },
        },
        loading: false,
      });
    }
  };

  useEffect(() => {
    loadIpAddressMetadata();
  }, []);
  const { data, loading } = state;

  const renderItems = (key: string) => {
    const { data } = state;
    switch (key) {
      case 'city':
        return (
          <div key={key} className='fe-dflex fe-dflex-space-between'>
            <div className={`${prefixCls}__ipCell-item`}>
              <div className={`${prefixCls}__ipCell-item-name`}>City</div>
              <div className={`${prefixCls}__ipCell-item-desc`}>{data[key] ?? ''}</div>
            </div>
            <div className={`${prefixCls}__ipCell-item`}>
              <div className={`${prefixCls}__ipCell-item-name`}>Zip</div>
              <div className={`${prefixCls}__ipCell-item-desc`}>{data.zip ?? ''}</div>
            </div>
          </div>
        );
      case 'latitude':
        return (
          <div key={key} className={`${prefixCls}__ipCell-item`}>
            <div className={`${prefixCls}__ipCell-item-name`}>Latitude, Longitude</div>
            <div className={`${prefixCls}__ipCell-item-desc`}>
              {data.latitude ? `${data.latitude.toFixed(4)},` : ''}
              {data.longitude ? data.longitude.toFixed(4) : ''}
            </div>
          </div>
        );
      case 'country_name':
        return (
          <div key={key} className={`${prefixCls}__ipCell-item`}>
            <div className={`${prefixCls}__ipCell-item-name`}>Country</div>
            <div className={`${prefixCls}__ipCell-item-desc`}>{data[key] ?? ''}</div>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Popup
      ref={popupRef}
      action='click'
      trigger={
        <div className={`${prefixCls}__ipCell`}>
          <div className={`${prefixCls}__ipCell-countryFlag`}>
            {loading ? <Loader size={15} /> : data?.location?.country_flag_emoji ?? <Icon name='globe' />}
          </div>
          <div className={`${prefixCls}__ipCell-ipAddress`}>{props.value}</div>
        </div>
      }
      content={
        <div className={`${prefixCls}__ipCell-window`}>
          <div className={`${prefixCls}__ipCell-window-title`}>
            IP ADDRESS {props.value} <Icon name='close' onClick={() => popupRef?.current?.closePopup?.()} />
          </div>
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
                      // @ts-ignore
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
