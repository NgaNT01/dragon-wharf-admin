export const convertObjectToParams = (obj) => {
    const {from, to} = obj;
    return `/${from}T00:00:00.000+00:00/${to}T00:00:00.000+00:00`
}