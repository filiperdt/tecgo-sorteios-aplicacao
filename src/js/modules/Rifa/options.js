export const optionsPadrao = {
    mode: 'cors',
    cache: 'default'
};
export const optionsPadraoComHeaders = {
    ...optionsPadrao,
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
};
export const optionsListRifas = {
    ...optionsPadrao,
    method: 'GET'
};
export const optionsCreateRifa = body => (
    {
        ...optionsPadraoComHeaders,
        method: 'POST',
        body: JSON.stringify({
            ...body
        })
    }
);
export const optionsReadRifa = {
    ...optionsPadrao,
    method: 'GET'
};
export const optionsUpdateRifa = body => (
    {
        ...optionsPadraoComHeaders,
        method: 'PUT',
        body: JSON.stringify({
            ...body
        })
    }
);
export const optionsDeleteRifa = {
    ...optionsPadrao,
    method: 'DELETE'
};