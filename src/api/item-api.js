import { ajax } from '~/src/utils/utils';

export function fetchItems(pageNumber) {
    return ajax('GET', `/documents?page=${pageNumber}`);
}
