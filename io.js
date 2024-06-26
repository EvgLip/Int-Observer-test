'use strict';
//елемент с классом '.root' не вызывает события пересечений с
//елементом '.target' ПОЧЕМУ ?????
//потому что div.scrolling имел правило position: absolute
//и выходил из общего потока
const $root = document.querySelector( '.root' );
// const $root = document.querySelector( '.scrolling' );
const $boundingClientRect = document.querySelector( '.bounding-client-rect' );
const $intersectionRatio = document.querySelector( '.intersection-ratio' );
const $intersectionRect = document.querySelector( '.intersection-rect' );
const $isIntersecting = document.querySelector( '.is-intersecting' );
const $isVisible = document.querySelector( '.is-visible' );
const $rootBounds = document.querySelector( '.root-bounds' );
const $target = document.querySelector( '.target' );
const $position = document.querySelector( '.position' );
const $btnNormal = document.querySelector( '.btn-normal-target' );
const $btnHigh = document.querySelector( '.btn-high-target' );

const options =
{
   root: $root,
   rootMargin: '0px',
   threshold: [ ...Array( 11 ).keys() ].map( ind => ind = ind / 10 )
};

const io = new IntersectionObserver( callBackFn, options );
io.observe( $target );

function callBackFn ( ioEntries, observer )
{
   const ioEntry = ioEntries[ 0 ];
   // console.log( entries );
   //console.log( observer );

   //почему следующая инструкция возвращает пустой массив?
   //как считать все свойства-значения из объекта entries[ 0 ].boundingClientRect
   // console.log( Object.entries( ioEntries[ 0 ].boundingClientRect ) );

   const _boundingClientRect = ioEntry.boundingClientRect;
   const textBoundingClientRect = `x: ${_boundingClientRect.x}; y: ${_boundingClientRect.y}; right: ${_boundingClientRect.right}; bottom: ${_boundingClientRect.bottom}`;

   const _intersectionRatio = ioEntry.intersectionRatio;

   const _intersectionRect = ioEntry.intersectionRect;
   const textIntersectionRect = `x: ${_intersectionRect.x}; y: ${_intersectionRect.y}; right: ${_intersectionRect.right}; bottom: ${_intersectionRect.bottom}`;

   const _isIntersecting = ioEntry.isIntersecting;
   const _isVisible = ioEntry.isVisible;

   const _rootBounds = ioEntry.rootBounds;
   const textRootBounds = `x: ${_rootBounds.x}; y: ${_rootBounds.y}; right: ${_rootBounds.right}; bottom: ${_rootBounds.bottom}`;

   let tellPosition = 'элемент ';

   if ( _isIntersecting )
   {
      if ( _intersectionRatio < 1 )
         tellPosition += 'частично внутри ';
      else
         tellPosition += 'внутри ';
      //слева или справа
      if ( _boundingClientRect.x < _intersectionRect.x )
         tellPosition += 'слева ';
      else if ( _boundingClientRect.right > _intersectionRect.right )
         tellPosition += 'справа ';
      //из-з неточности?? метода не всегда определяестя промежуточное положение
      //между лево и право
      //обычно это происходит при резком движении скролла
      else tellPosition += '';
      //внизу или вверху
      if ( _boundingClientRect.y < _intersectionRect.y )
         tellPosition += 'вверху';
      else if ( _boundingClientRect.bottom > _intersectionRect.bottom )
         tellPosition += 'внизу';
      else tellPosition += '';
   }
   else tellPosition = 'элемент снаружи';

   $boundingClientRect.textContent = textBoundingClientRect;
   $intersectionRatio.textContent = _intersectionRatio;
   $intersectionRect.textContent = textIntersectionRect;
   $isIntersecting.textContent = _isIntersecting;
   $isVisible.textContent = _isVisible;
   $rootBounds.textContent = textRootBounds;
   $position.textContent = tellPosition;
}

$btnNormal.addEventListener( 'click', btn_OnClick );
$btnHigh.addEventListener( 'click', btn_OnClick );

function btn_OnClick ( e )
{
   $target.classList.remove( 'target-normal' );
   $target.classList.remove( 'target-high' );

   if ( e.target === $btnNormal ) $target.classList.add( 'target-normal' );
   if ( e.target === $btnHigh ) $target.classList.add( 'target-high' );


}