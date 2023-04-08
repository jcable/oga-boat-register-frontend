const OneFoot = 0.3048;

const pounds = new Intl.NumberFormat('en-GB', { currency: 'GBP', style: 'currency' });

export function formatDesignerBuilder (b, k) {
  const data = b?.[k];
  if (data?.name) {
    return data.name;
  }
  if (Array.isArray(data)) {
    return data.map((d) => d.name).join(' / ');
  }
}

export function price(n) {
    if (n === 0) {
        return 'offers';
    }
    return pounds.format(n);
}

export function m2dfn(val) {
  if(val) {
      return Math.round(1000*val/OneFoot) / 1000;
  }
}

export function m2df(val) {
    if(val) {
       //  return (val/OneFoot).toFixed(2);
       return m2dfn(val).toFixed(2);
    }
}

export function feet(n) {
  return `${n.toFixed(2)} ft`;
}

export function m2f(val) {
  if(val) {
    // return `${m2df(val)} ft`
    return feet(m2dfn(val))
  }
};

export function m2dsqf(val) {
    if(val) {
        return (val/OneFoot/OneFoot).toFixed(3);
    }
}

export function m2dsqfn(val) {
    if(val) {
        return parseFloat((val/OneFoot/OneFoot).toFixed(3));
    }
}

export function f2m(val) {
    if(val) {
        return Math.round(1000*OneFoot*val)/1000;
    }
}

export function f2m2(val) {
    if(val) {
        return Math.round(1000*OneFoot*OneFoot*val)/1000;
    }
}


const metreKeys = [
    'beam','draft','draft_keel_down', 'air_draft',
    'perpendicular','luff','head','leech','foot',
    'length_on_deck','length_on_waterline','length_over_all',
    'length_over_spars', 'length_overall',
    'fore_triangle_height','fore_triangle_base',
  ];
  const squareMetreKeys = ['sailarea'];
  const booleanKeys = ['year_is_approximate'];
  const keysToOmit = [
  ];
  /*
  biggest staysail (luff, leech, foot)
  biggest jib (luff, leech, foot)
  biggest downwind sail (luff, leech, foot)
  */
  export function boatm2f(obj) {
    if(obj) {
      if(Array.isArray(obj)) {
        return obj.map((n) => boatm2f(n))
      } else if (typeof obj === 'object') {
        const r = {};
        Object.keys(obj).forEach(k => {
          if(metreKeys.includes(k)) {
            r[k] = m2dfn(obj[k]);
          } else if(squareMetreKeys.includes(k)) {
            r[k] = m2dsqfn(obj[k]);
          } else if(booleanKeys.includes(k)) {
            r[k] = !!obj[k];
          } else if (obj[k]){
            r[k] = boatm2f(obj[k]);
          }
        });
        return r;
      } else {
        return obj;
      }
    } else {
      return undefined;
    }
  }
  
  export function boatf2m(obj) {
    if(obj) {
      if(Array.isArray(obj)) {
        return obj.map((n) => boatm2f(n))
      } else if (typeof obj === 'object') {
        const r = {};
        Object.keys(obj).forEach(k => {
          if(metreKeys.includes(k)) {
            r[k] = f2m(obj[k]);
          } else if(squareMetreKeys.includes(k)) {
            r[k] = f2m2(obj[k]);
          } else if(booleanKeys.includes(k)) {
            r[k] = !!obj[k];
          } else {
            if (obj[k]) {
              r[k] = boatf2m(obj[k]);
            }
          } 
        });
        return r;
      } else {
        return obj;
      }
    }
    return obj;
  }
  
  export function boatDefined(obj) {
    if(obj) {
      if(Array.isArray(obj)) {
        return obj.map((n) => boatDefined(n))
      } else if (typeof obj === 'object') {
        const r = {};
        Object.keys(obj).forEach(k => {
          if(metreKeys.includes(k)) {
            r[k] = obj[k];
          } else if(squareMetreKeys.includes(k)) {
            r[k] = obj[k];
          } else if(booleanKeys.includes(k)) {
            r[k] = !!obj[k];
          } else if (keysToOmit.includes(k)) {
            // console.log('omitting', k);
          } else {
            if (obj[k]) {
              r[k] = boatDefined(obj[k]);
            }
          } 
        });
        return r;
      } else {
        return obj;
      }
    }
    return obj;
  }
  
  export function m2fall(o) {
    if(o) {
        return Object.keys(o).map(k => m2dfn(o[k]));
    }
  }
