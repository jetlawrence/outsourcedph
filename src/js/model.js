'use strict';
import Immutable from 'immutable'

export const User = Immutable.Record({
    title: null, 
    fname: null,
    lname: null,
    address: null,
    birthdate: null
});

export const Address = Immutable.Record({
    street: null,
    town: null,
    postcode: null
});