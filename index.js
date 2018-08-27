
var _ = {};

// // ARRAYS

// // _.first(array, [n])
// // Returns an array with the first n elements of an array.
// // If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
	if (!(array && array.length)){
		return [];
	}
	else if ((n <= 0) || isNaN(n)) {
		return [array[0]];
	}
	else if ( n> array.length) {
		return array;
	}
	else {
		array = Array.prototype.slice.call(array);
		return array.splice(0,n);
	}
};

// _.first = function (array, n) {
// 	if (!Array.isArray(array)){
// 		return [];
// 	}
// 	else if ((n <= 0) || isNaN(n)) {
// 		return [array[0]];
// 	}
// 	else if ( n> array.length) {
// 		return array;
// 	}
// 	else {
// 		array = Array.prototype.slice.call(array);
// 		return array.splice(0,n);
// 	}
// };

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
	if (!(array && array.length)) {
		return [];
	}
	else if (n > array.length){
		return array;
	}
	else if ((n<=0) || isNaN(n)){
		return [array[array.length-1]];
	}
	else {
		return Array.prototype.slice.call(array, -n);
	}
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
	let niz = [];
	for (let chlan in array){
		if (niz.indexOf(array[chlan]) === -1){
			niz.push(array[chlan]);
		}
	}
	return niz;
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {

	for (let prop in source){
		if (source.hasOwnProperty(prop)) {
			destination[prop] = source[prop];
		}
	}
	return destination;

	// writting same function as _.defaults returns true
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
	for (let prop in source) {
    	if (source.hasOwnProperty(prop) && destination[prop] === undefined) {
      		destination[prop] = source[prop];
    }
  }
  return destination;
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) /* if collection i array */{
    for (let i = 0; i < collection.length; i++) {
      // function.call(context, arg1, arg2, arg3) - bound to context if one is passed
      iteratee.call(context, collection[i], i, collection);
    }
    // let i in collection is not working, but normal looping works why?
  }
  else /*if collection is object */{
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        iteratee.call(context, collection[key], key, collection);
      }
    }
  }
  return collection;
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) /* (numbers, 3)*/ {
	// _.each(niz,function(niz[i], i) {
  var niz = [];
  _.each(collection, function (element, key) {
    (element === value)? niz.push(key):null;
  });
  return niz;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
	let niz = [];
  _.each(collection, function (element, key) {
    niz.push(iteratee.call(context, element, key, collection));
  });
  return niz;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
	_.each(collection, function (element, key) {
    if (accumulator === undefined) /*if acumulator is not present, first element will be assigned as accumulator value*/ {
      accumulator = element;
    } else {
      accumulator = iteratee.call(context, accumulator, element, key, collection);
    }
  });
  return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
	const niz = [];
  _.each(collection, function (element, key) {
    if (predicate.call(context, element, key, collection)) /*if passed, it will push predicate to niz*/ {
      niz.push(element);
    }
  });
  return niz;
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
	return _.filter(collection, (element, key, collection) => {
    return !predicate.call(context, element, key, collection)
  })
};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to re-implement a modified _.each().
_.every = function (collection, predicate, context) {
	if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        return false;
      }
    } //returns true only if every element of collection passes, returns false and breaks if not
  }
  else {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (!predicate.call(context, collection[key], key, collection)) {
          return false;
        }
      }
    }
  }
  return true;
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        return true;
      }
    }
  }
  else {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (predicate.call(context, collection[key], key, collection)) {
          return true;
        }
      }
    }
  }
  return false;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {
	const res = [];
  const args = Array.prototype.slice.call(arguments, 2);
  _.each(collection, function (element) {
  	console.log(element[methodName], methodName);
    res.push(element[methodName].apply(element, args));
  });
  return res;
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
	return _.map(collection, function (value) {
    return value[propertyName];
  });
};



// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time.
// Repeated calls to the modified function will have no effect,
// returning the value from the original call. Useful for initialization functions,
// instead of having to set a boolean flag and then check it later.
_.once = function(func) {
  let alreadyCalled = false;
    let result;

  return function() {
    if(!alreadyCalled) {
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
      
    return result;
  };
};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
	let cache = {};
  return function () {
    // transform arguments, which is an array-like object, to an array
    const args = Array.prototype.slice.call(arguments);
    // if the argument is in cache, it will return the cache value
    if (args in cache) {
      return cache[args];
    // if the argument is not cached, the function is executed and added to the cache
    } else {
      return cache[args] = func.apply(this, args);
    }
  };
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {
	const args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function () {
    // invoke the function with the arguments
    func.apply(this, args); // func(...args);
    // after wait milliseconds
  }, wait);
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly, will only call the original function
// at most once per every wait milliseconds, and otherwise will
// just return the last computed result. Useful for rate-limiting
// events that occur faster than you can keep up with.
_.throttle = function (func, wait) {
	let calledOnce = false;
  	let result;
  	return function () {
    	if (!calledOnce) {
      		result = func.apply(this, arguments);
      		calledOnce = true;
      
      		setTimeout(function () {
        		calledOnce = false;
      		}, wait);
    	}
    return result;
	};
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
