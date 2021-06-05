import collections
import uuid # only needed for testing out the LRUCache below. Would not be needed if getBookInfo(isbn) was a non-stub function.

# A Book
class BookRecord:
	def __init__(self, title, author, language):
		self.title = title
		self.author = author
		self.language = language

	# Representation of Book
	def __repr__(self):
		return("Title: " + self.title + " Author: " + self.author + " Language: " + self.language)

# We will use a LRU cache to efficiently optimize performance
# The LRU Cache is a queue with a hash table (dictionary). Thus, an OrderedDict can be made to be a LRU Cache, with a specific order maintained.
# THe first element of the OrderedDict is the least recently accessed book record
# The last element of the OrderedDict is the most recently accessed record.
class LRUCache:
	# n is the capacity of the LRU Cache
	def __init__(self, n):
		self.cache = collections.OrderedDict()
		self.capacity = n

	# this function would not be needed in an actual use case of this problem. See function wrapper() for more information.
	def getBookRecord(self, isbn):
		if isbn not in self.cache:
			# this book record is currently not in the LRU Cache
			return None
		else:
			# we have most recently accessed this book record; move it to the end of the OrderedDict
			# return the book record for the according isbn
			# utilize move_to_end function of OrderedDict
			self.cache.move_to_end(isbn)
			return self.cache[isbn]
	
	def insertBookRecord(self, isbn, bookRecord):
		# insert the book record for the according isbn regardless of anything
		# Then, move it to the end of the OrderedDict (most recently accessed record)
		self.cache[isbn] = bookRecord
		self.cache.move_to_end(isbn)

		# if the max size allowed - N in the problem description - is exceeded, remove the FIRST book record from the OrderedDictionary (as it is least recently accessed)
		# last=False pops the item in FIFO (queue) fashion, last=True pops the item in LIFO (stack) fashion
		if self.capacity < len(self.cache):
			self.cache.popitem(last = False)


# stub function; assume it retrieves book from database
def getBookInfo(isbn):
	# would return (isbn, retrievedBook) in reality
	return

def wrapper(max):
	# In the wrapper, if getBookInfo() was a non-stub function, we would simply insert each book and isbn as we access them from getBookInfo()
	# The LRU cache would be modified accordingly using only insertBookRecord(isbn, bookRecord).
	# In the actual use case, getBookRecord() would not be used to have a working LRU cache.
	# However, I made this getBookRecord() to show that the LRU cache is working as intended.

	# Our LRU cache
	bookRecordCache = LRUCache(max)

	# A simple testcase with 3 books.
	testBookRecord1 = BookRecord("Test1", "Shardul Shah", "English")
	testBookRecord2 = BookRecord("Test2", "Shardul Shah", "English")
	testBookRecord3 = BookRecord("Test3", "Shardul Shah", "English")

	# generate 3 random strings acting as ISBNs
	isbn1 = str(uuid.uuid4())
	isbn2 = str(uuid.uuid4())
	isbn3 = str(uuid.uuid4())

	# demonstrates the LRUCache working as intended in the terminal
	bookRecordCache.insertBookRecord(isbn1, testBookRecord1)
	print(bookRecordCache.cache, "\n")
	bookRecordCache.insertBookRecord(isbn2, testBookRecord2)
	print(bookRecordCache.cache, "\n")
	bookRecordCache.getBookRecord(isbn1)
	print(bookRecordCache.cache, "\n")
	bookRecordCache.insertBookRecord(isbn3, testBookRecord3)
	print(bookRecordCache.cache, "\n")

	 # note this does nothing as isbn2 is no longer in the LRU cache - it was least recently accessed when isbn3 was inserted.
	bookRecordCache.getBookRecord(isbn2)
	print(bookRecordCache.cache, "\n")
	
	bookRecordCache.getBookRecord(isbn1)
	print(bookRecordCache.cache, "\n")

def main():
	maxBookRecords = 2

	# test out wrapper function on program run
	wrapper(maxBookRecords)

if __name__ == '__main__':
	main()
