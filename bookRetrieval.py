"""
Assume we have a function get_book_info(isbn) that takes a string ISBN argument
and retrieves a struct/object containing the Title, Author, and Language of a book
(each represented as a string) from a database. Write a wrapper function that
increases performance by keeping some of the database results in memory for the
quick lookup.
To prevent memory from growing unbounded, we only want to store a maximum of N
book records. At any given time, we should be storing the N books that we accessed
most recently. Assume that N can be a large number when making decisions about
choices of data structure(s) and algorithm(s).
"""
import collections
import uuid

class BookRecord:
	def __init__(self, title, author, language):
		self.title = title
		self.author = author
		self.language = language

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

	def getBookRecord(self, isbn):
		if isbn not in self.cache:
			# this book record is currently not in the LRU Cache
			return -1
		else:
			# we have most recently accessed this book record; move it to the end of the OrderedDict
			# return the book record for the according isbn
			# utilize move_to_end function of OrderedDict
			self.cache.move_to_end(isbn)
			return self.cache[isbn]
	
	def insertBookRecord(self, isbn, bookRecord):
		# insert the book record for the according isbn regardless of anything
		# Then, then move it to the end of the OrderedDict (most recently accessed record)
		self.cache[isbn] = bookRecord
		self.cache.move_to_end(isbn)

		# if the max size allowed - N in the problem description - is exceeded, remove the FIRST book record from the OrderedDictionary (as it is least recently accessed)
		# last=False pops the item in FIFO (queue) fashion, last=True pops the item in LIFO (stack) fashion
		if self.capacity < len(self.cache):
			self.cache.popitem(last = False)


def getBookInfo(isbn):
	# retrieve book from database

	# book is of type Book
	return bookRecord

def wrapper(max):
	bookRecordCache = LRUCache(max)

	testBookRecord1 = BookRecord("Test1", "Shardul Shah", "English")
	testBookRecord2 = BookRecord("Test2", "Shardul Shah", "English")
	testBookRecord3 = BookRecord("Test3", "Shardul Shah", "English")

	# generate 3 random strings acting as ISBNs
	isbn1 = str(uuid.uuid4())
	isbn2 = str(uuid.uuid4())
	isbn3 = str(uuid.uuid4())

	bookRecordCache.insertBookRecord(isbn1, testBookRecord1)
	print(bookRecordCache.cache, "\n")
	bookRecordCache.insertBookRecord(isbn2, testBookRecord2)
	print(bookRecordCache.cache, "\n")
	bookRecordCache.getBookRecord(isbn1)
	print(bookRecordCache.cache, "\n")

def main():
	wrapper(2)

if __name__ == '__main__':
	main()
