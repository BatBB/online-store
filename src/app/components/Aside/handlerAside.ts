/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { App, userQuery } from '../../App';

export default function handlerAside() {
    const filterContainer = document.querySelector('.filter_list');

    // const priceLower = document.querySelector('#lower-price');
    // const priceUpper = document.querySelector('#upper-price') as HTMLInputElement;
    // const stockLower = document.querySelector('#lower-stock') as HTMLInputElement;
    // const stockUpper = document.querySelector('#upper-stock') as HTMLInputElement;
    // userQuery.userParams?.searchParams.set('price', String(priceLower.value + '|' + priceUpper.value));
    // userQuery.userParams?.searchParams.set('price', String(stockLower.value + '|' + stockUpper.value));
    // console.log(true);
    // console.log(priceLower);
    filterContainer?.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.id === 'lower-price') {
            userQuery.price.min = +target.value;
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            userQuery.userParams?.searchParams.set('price', `${userQuery.price.min}|${userQuery.price.max}`);
        }
        if (target.id === 'upper-price') {
            userQuery.price.max = +target.value;
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            userQuery.userParams?.searchParams.set('price', `${userQuery.price.min}|${userQuery.price.max}`);
        }

        if (target.id === 'lower-stock') {
            userQuery.stock.min = +target.value;
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            userQuery.userParams?.searchParams.set('stock', `${userQuery.stock.min}|${userQuery.stock.max}`);
        }
        if (target.id === 'upper-stock') {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            userQuery.userParams?.searchParams.set('stock', `${userQuery.stock.min}|${userQuery.stock.max}`);
            userQuery.stock.max = +target.value;
        }
        //

        if (target.checked && target.parentElement?.parentElement!.className === 'filter-list__inner--Category') {
            userQuery.category.push(target.id);
            userQuery.userParams?.searchParams.set('category', userQuery.category.join('|'));
            if (!userQuery.userParams?.searchParams.get('category')) console.log(true);
        } else if (
            !target.checked &&
            target.parentElement?.parentElement!.className === 'filter-list__inner--Category'
        ) {
            userQuery.category = userQuery.category.filter((category) => category !== target.id);
            userQuery.userParams?.searchParams.set('category', userQuery.category.join('|'));
            if (userQuery.userParams?.searchParams.get('category') === '') {
                userQuery.userParams?.searchParams.delete('category');
            }
        } else if (target.checked && target.parentElement?.parentElement!.className === 'filter-list__inner--Brand') {
            userQuery.brand.push(target.id);
            userQuery.userParams?.searchParams.set('brand', userQuery.brand.join('|'));
        } else if (!target.checked && target.parentElement?.parentElement!.className === 'filter-list__inner--Brand') {
            userQuery.brand = userQuery.brand.filter((brand) => brand !== target.id);
            userQuery.userParams?.searchParams.set('brand', userQuery.brand.join('|'));
            if (userQuery.userParams?.searchParams.get('brand') === '') {
                userQuery.userParams?.searchParams.delete('brand');
            }
        }

        if (userQuery.userParams?.search.toString() == '') {
            history.pushState({}, '', '/');
        } else {
            history.pushState({}, '', userQuery.userParams?.search);
        }
        App.mainPage.render();
    });
}
