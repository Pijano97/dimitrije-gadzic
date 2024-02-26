Since this is quick and dirty solution, I'd quickly explain logic behind it.

Main idea for this project: 
- poll endpoint, use 'continuation' as offset from previous request for the next one
- filter events based on required criteria
- save filtered events as activities
- create monitoring mechanism for saved activities
- be used to update tokens data using above-mentioned mechanism

Notes:
- I could not set up MySQL. I was able to get it to work with DB browser, but could not get it to work with app. It had to do with user 
  not being recognized...because of that I've 
decided to use PostgreSQL.
- I did not create any tests. If I were to choose between tests, I'd opt for integration tests. In my opinion those are enough to 
  test completeness of the project. Of course - on real project I'd take care of whole test pyramid.
- For project to be maintainable and easy to use it is necessary to introduce proper types.

Scalability:
For this project to be scalable, I'd introduce DB table locking mechanism so that multiple instances do not overlap while polling data 
(e.g. there should not be two same requests) and that there is no overlap for processing of activities (e.g. no event should be 
processed twice). Something similar to scheduling mechanism. 

Efficiency Optimization:
For this project to be more efficient, I'd use something that has power to stream almost unlimited messages like Kafka.
