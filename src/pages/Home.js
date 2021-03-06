import Card from '../components/Card';
import { Helmet } from 'react-helmet';

const Home = ({
    isLoading,
    cartItems,
    search,
    setSearch,
    searchItems,
    items,
    onAddToCart,
    onAddToFavorite,
}) => {
    const renderItems = () => {
        const filteredItems = items.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filteredItems).map(
            (item, index) => (
                <Card
                    cartItems={cartItems}
                    onAddToCart={obj => onAddToCart(obj)}
                    onAddToFavorite={obj => onAddToFavorite(obj)}
                    loading={isLoading}
                    key={index}
                    {...item}
                />
            )
        );
    };

    return (
        <div className='content p-40'>
            <Helmet>
                <title>Магазин кроссовок "React Sneakers"</title>
                <meta
                    name='description'
                    content='Магазин кроссовок "React Sneakers"'
                />
            </Helmet>
            <div className='d-flex align-center justify-between mb-40'>
                <h1 className='mb-40'>
                    {search ? `Поиск по запросу "${search}"` : 'Все кроссовки'}
                </h1>
                <div className='search-block d-flex'>
                    <img src='/img/search.svg' alt='Search' />
                    {search && (
                        <img
                            className='clear cu-p'
                            src='/img/btn-remove.svg'
                            alt='Clear'
                            onClick={() => setSearch('')}
                        />
                    )}
                    <input
                        placeholder='Поиск...'
                        onChange={searchItems}
                        value={search}
                    />
                </div>
            </div>
            <div className='d-flex flex-wrap'>{renderItems()}</div>
        </div>
    );
};

export default Home;
